AWS_PROFILE ?= naeseth-admin
VAULT := aws-vault exec --no-session $(AWS_PROFILE) --

.PHONY: all plan apply destroy configure-state

all: plan

plan:
	$(VAULT) terraform plan

apply:
	$(VAULT) terraform apply

destroy:
	$(VAULT) terraform destroy

configure-state:
	$(VAULT) terraform remote config -backend=s3 -backend-config='bucket=naeseth-terraform-state' -backend-config='key=naeseth.tfstate' -backend-config='region=us-west-1'
