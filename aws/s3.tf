resource "aws_s3_bucket" "logs" {
  bucket = "naeseth-logs"
  acl    = "log-delivery-write"
}

resource "aws_s3_bucket" "naeseth" {
  bucket = "naeseth.com"
  acl    = "public-read"

  website {
    index_document = "index.html"
    error_document = "404/index.html"
  }

  logging {
    target_bucket = "${aws_s3_bucket.logs.id}"
    target_prefix = "naeseth.com/"
  }

  versioning {
    enabled = true
  }
}

resource "aws_s3_bucket" "www-naeseth" {
  bucket = "www.naeseth.com"
  acl    = "public-read"

  website {
    redirect_all_requests_to = "naeseth.com"
  }

  logging {
    target_bucket = "${aws_s3_bucket.logs.id}"
    target_prefix = "www.naeseth.com/"
  }
}

resource "aws_s3_bucket" "naeseth-static" {
  bucket = "static.naeseth.com"
  acl    = "public-read"

  website {
    index_document = "index.html"
  }

  cors_rule {
    allowed_headers = ["Authorization"]
    allowed_methods = ["GET"]
    max_age_seconds = 3000

    allowed_origins = [
      "http://naeseth.com",
      "http://www.naeseth.com",
      "https://naeseth.com",
      "https://www.naeseth.com",
    ]
  }

  logging {
    target_bucket = "${aws_s3_bucket.logs.id}"
    target_prefix = "static.naeseth.com/"
  }
}

resource "aws_iam_user" "naeseth_deploy" {
  name = "deploy"
}

resource "aws_iam_access_key" "naeseth_deploy" {
  user    = "${aws_iam_user.naeseth_deploy.name}"
  pgp_key = "keybase:enaeseth"
}

resource "aws_iam_user_policy" "naeseth_deploy" {
  name   = "naeseth_deploy"
  user   = "${aws_iam_user.naeseth_deploy.name}"
  policy = "${data.aws_iam_policy_document.naeseth_deploy.json}"
}

data "aws_iam_policy_document" "naeseth_deploy" {
  statement {
    actions   = ["s3:ListAllMyBuckets", "s3:GetBucketLocation"]
    resources = ["arn:aws:s3:::*"]
  }

  statement {
    actions = [
      "s3:ListBucket",
      "s3:ListBucketVersions",
      "s3:GetObject",
      "s3:GetObject*",
      "s3:PutObject",
      "s3:PutObject*",
      "s3:DeleteObject",
      "s3:DeleteObject*",
      "s3:RestoreObject",
    ]

    resources = [
      "${aws_s3_bucket.naeseth.arn}",
      "${aws_s3_bucket.naeseth.arn}/*",
    ]
  }
}
