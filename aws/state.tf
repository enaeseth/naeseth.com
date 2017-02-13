resource "aws_s3_bucket" "state" {
  bucket = "naeseth-terraform-state"
  acl    = "private"

  versioning {
    enabled = true
  }
}
