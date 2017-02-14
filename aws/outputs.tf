output "deploy_access_key_id" {
  value = "${aws_iam_access_key.naeseth_deploy.id}"
}

output "deploy_secret_key" {
  value     = "${aws_iam_access_key.naeseth_deploy.encrypted_secret}"
  sensitive = true
}
