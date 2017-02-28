---
layout: post
path: /dns-hostnames-in-terraform/
title: Using DNS hostnames in Terraform
date: '2017-02-27'
---

When setting up cloud resources using [Terraform][terraform], you sometimes need to provide a list of IP addresses or [CIDR][cidr] ranges when all you have available is a hostname – for example, when setting up an AWS [security group][sg].

With the stock set of providers in Terraform, you must resolve the hostname manually and copy the IP's into your configuration:

```tf
resource "aws_security_group" "papertrail" {
  egress {
    protocol  = "tcp"
    from_port = 12345
    to_port   = 12345

    # logs5.papertrailapp.com
    cidr_blocks = [
      "169.46.82.178/32",
      "169.46.82.179/32",
      "169.46.82.180/32",
      "169.46.82.181/32",
    ]
  }
}
```

I find this a little annoying for a few reasons: first, as a programmer, I'm always trying to find ways to avoid manual labor; second, you need to remember to leave a comment explaining where these magic numbers came from; and third, if the service provider ever changes their A records, you might spend some time wondering why your app suddenly broke before you re-discover that you hardcoded addresses in your config.

But Terraform is easily extended through plugins, and if you want it to be able to manage resources and access data sources it doesn't support out of the box, you can write a fairly small Go program to implement it.

Enter [terraform-provider-dns][tada]:

```tf
data "dns_addresses" "papertrail" {
  hostname = "logs5.papertrailapp.com"
}

resource "aws_security_group" "papertrail" {
  egress {
    protocol    = "tcp"
    from_port   = 12345
    to_port     = 12345
    cidr_blocks = ["${data.dns_addresses.papertrail.ipv4_cidrs}"]
  }
}
```

Now, as Terraform makes its plan, it resolves the hostname for you. If the host's IP addresses change, your resources will change too when you rerun `terraform apply`.

To install a Terraform plugin, download [the plugin binary][release], put it somewhere sensible, and update your [`~/.terraformrc`][trc] to inform Terraform about its new abilities.

I've included a [setup script][setup] with the provder; to install it automatically on macOS, Linux, FreeBSD, or OpenBSD, you can instead simply run:

```sh
curl -L https://github.com/union-wtf/terraform-provider-dns/raw/master/install.sh | bash
```

Enjoy!

[terraform]: https://www.terraform.io/
[cidr]: https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing
[sg]: https://www.terraform.io/docs/providers/aws/r/security_group.html
[tada]: https://github.com/union-wtf/terraform-provider-dns
[release]: https://github.com/union-wtf/terraform-provider-dns/releases/latest
[trc]: https://www.terraform.io/docs/plugins/basics.html
[setup]: https://github.com/union-wtf/terraform-provider-dns/blob/master/install.sh
