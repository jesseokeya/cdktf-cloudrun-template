TEST_FLAGS ?=

all:
	@echo "******************************"
	@echo "**  CDKTF CloudRun Tools    **"
	@echo "******************************"
	@echo "make <cmd>"
	@echo ""
	@echo "commands:"
	@echo "  tools                   - setup tools for development "
	@echo ""
	@echo ""
	@echo "  client-install          - install client dependencies"
	@echo "  client-build            - build client"
	@echo "  client-run              - run client"
	@echo "  api-install             - install api dependencies"
	@echo "  api-run                 - run api"
	@echo ""
	@echo ""

print-%: ; @echo $*=$($*)


##
## Tools
##
tools:
	make client-install
	make client-build
	make api-install
	make cdktf-cli-install
	make cdktf-install

##
# Client
##
client-install:
	@cd client && npm install

client-build:
	@cd client && npm run build

client-run:
	@cd client && npm run start

##
# API
##
api-install:
	@cd api && make tools

api-run:
	@cd api && make run

##
# CDKTF
##
cdktf-cli-install:
	@cd cdktf && npm install --global cdktf-cli@latest

cdktf-install:
	@cd cdktf && npm install

cdktf-deploy:
	@cd cdktf && npm i && cdktf list && cdktf synth && cdktf deploy --all

cdktf-destroy:
	@cd cdktf && cdktf destroy --all
