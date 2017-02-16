AWS_PROFILE ?= naeseth-deploy
VAULT := aws-vault exec $(AWS_PROFILE) --

.PHONY: all build deploy

all: build

build:
	yarn run build

dry-deploy: build
	$(VAULT) aws s3 sync --dryrun --acl public-read public s3://naeseth.com

deploy: build
	$(VAULT) aws s3 sync --acl public-read --delete public s3://naeseth.com
	$(VAULT) aws s3 cp --acl public-read --website-redirect /first-burn/ public/first-burn/index.html s3://naeseth.com/first-burn
