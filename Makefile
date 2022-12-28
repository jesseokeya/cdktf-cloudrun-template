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
	make api-run

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