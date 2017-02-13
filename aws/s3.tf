resource "aws_s3_bucket" "logs" {
  bucket = "naeseth-logs"
  acl    = "log-delivery-write"
}

resource "aws_s3_bucket" "naeseth" {
  bucket = "naeseth.com"
  acl    = "public-read"

  website {
    index_document = "index.html"
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
