resource "aws_route53_zone" "naeseth" {
  name = "naeseth.com."
}

resource "aws_route53_record" "naeseth_root" {
  zone_id = "${aws_route53_zone.naeseth.zone_id}"
  name    = "naeseth.com"
  type    = "A"

  alias {
    zone_id                = "${aws_cloudfront_distribution.naeseth.hosted_zone_id}"
    name                   = "${aws_cloudfront_distribution.naeseth.domain_name}"
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "naeseth_www" {
  zone_id = "${aws_route53_zone.naeseth.zone_id}"
  name    = "www.naeseth.com"
  type    = "A"

  alias {
    zone_id                = "${aws_cloudfront_distribution.naeseth.hosted_zone_id}"
    name                   = "${aws_cloudfront_distribution.naeseth.domain_name}"
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "naeseth_static" {
  zone_id = "${aws_route53_zone.naeseth.zone_id}"
  name    = "static.naeseth.com"
  type    = "A"

  alias {
    zone_id                = "${aws_s3_bucket.naeseth-static.hosted_zone_id}"
    name                   = "${aws_s3_bucket.naeseth-static.website_domain}"
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "naeseth_mx" {
  zone_id = "${aws_route53_zone.naeseth.zone_id}"
  name    = "naeseth.com"
  type    = "MX"
  ttl     = "10800"

  records = [
    "1 ASPMX.L.GOOGLE.COM.",
    "3 ALT1.ASPMX.L.GOOGLE.COM.",
    "3 ALT2.ASPMX.L.GOOGLE.COM.",
    "5 ASPMX2.GOOGLEMAIL.COM.",
    "5 ASPMX3.GOOGLEMAIL.COM.",
    "5 ASPMX4.GOOGLEMAIL.COM.",
    "5 ASPMX5.GOOGLEMAIL.COM.",
  ]
}

resource "aws_route53_record" "naeseth_spf" {
  zone_id = "${aws_route53_zone.naeseth.zone_id}"
  name    = "naeseth.com"
  type    = "TXT"
  ttl     = "300"
  records = ["v=spf1 include:_spf.google.com ~all"]
}

resource "aws_route53_record" "naeseth_domainkey" {
  zone_id = "${aws_route53_zone.naeseth.zone_id}"
  name    = "google._domainkey.naeseth.com"
  type    = "TXT"
  ttl     = "300"
  records = ["v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCAnbtCMg5ewDIQzrHRCCWpUOsyMDKh+SVGKqKpF5wdmDzKFoFfSB2Doy501IhwoRQMM2b7GjonVMVIUyJrjjAKqunZStRSyfsSbRR2wlSfanCfxntpFqtwNUXhAqP/7b2UngX5xmHGcpbaA8FBoaPSZjCb4oefE1XwyjzDDM2x7wIDAQAB"]
}

resource "aws_route53_record" "naeseth_calendar" {
  zone_id = "${aws_route53_zone.naeseth.zone_id}"
  name    = "calendar.naeseth.com"
  type    = "CNAME"
  ttl     = "3600"
  records = ["ghs.google.com"]
}

resource "aws_route53_record" "naeseth_docs" {
  zone_id = "${aws_route53_zone.naeseth.zone_id}"
  name    = "docs.naeseth.com"
  type    = "CNAME"
  ttl     = "3600"
  records = ["ghs.google.com"]
}

resource "aws_route53_record" "naeseth_mail" {
  zone_id = "${aws_route53_zone.naeseth.zone_id}"
  name    = "mail.naeseth.com"
  type    = "CNAME"
  ttl     = "3600"
  records = ["ghs.google.com"]
}

resource "aws_route53_record" "naeseth_imap" {
  zone_id = "${aws_route53_zone.naeseth.zone_id}"
  name    = "imap.naeseth.com"
  type    = "CNAME"
  ttl     = "3600"
  records = ["imap.google.com"]
}

resource "aws_route53_record" "naeseth_smtp" {
  zone_id = "${aws_route53_zone.naeseth.zone_id}"
  name    = "smtp.naeseth.com"
  type    = "CNAME"
  ttl     = "3600"
  records = ["smtp.google.com"]
}

resource "aws_route53_record" "naeseth_keybase_verify" {
  zone_id = "${aws_route53_zone.naeseth.zone_id}"
  name    = "_keybase.naeseth.com"
  type    = "TXT"
  ttl     = "10800"
  records = ["keybase-site-verification=V5-ZUwVzkgdS3vyPOaJInoZ-beLqOEJBEvbukHRZjtc"]
}
