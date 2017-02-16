provider "aws" {
  alias  = "virginia"
  region = "us-east-1"
}

data "aws_acm_certificate" "naeseth" {
  provider = "aws.virginia"
  domain   = "naeseth.com"
}

resource "aws_cloudfront_origin_access_identity" "naeseth" {}

resource "aws_cloudfront_distribution" "naeseth" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  price_class         = "PriceClass_All"

  origin {
    origin_id   = "naeseth_s3"
    domain_name = "${aws_s3_bucket.naeseth.website_endpoint}"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  aliases = ["naeseth.com", "www.naeseth.com"]

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "naeseth_s3"
    compress         = true

    forwarded_values {
      query_string            = true
      query_string_cache_keys = ["t"]

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 300
    max_ttl                = 3600
  }

  viewer_certificate {
    acm_certificate_arn      = "${data.aws_acm_certificate.naeseth.arn}"
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1"
  }

  logging_config {
    bucket          = "${aws_s3_bucket.logs.bucket_domain_name}"
    prefix          = "cloudfront/"
    include_cookies = false
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}
