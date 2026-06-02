LOCAL_APP_IP	?=	localhost
LOCAL_APP_PORT	?=	5173

IMAGE_NAME = warped-citadel-ui/local
CONTAINER_NAME = warped-citadel-ui-wc_local-1


readme deploy_local: localappip    :=$(LOCAL_APP_IP)
readme deploy_local: localappport  :=$(LOCAL_APP_PORT)


.PHONY: readme deploy_local rip_deploy_local rip_local

readme:
	@echo \
"\n**** Stop! You must run make with a specific target! ****\n\
\n\
To drop and recreate warped-citadel-ui, use one of these targets.\n\
Ensure you have a .env file to map secrets for warped-citadel-ui and aws config.\n\
if you dont have an .env file you must make one in the root directory for the S3 connection to work.\n\
For more help refer to the documentation in Github. \n\
\n\
	rip_deploy_local	Drop and recreate the LOCAL warped-citadel-ui container at $(localappip):$(localappport).\n\
\n\
	deploy_local		Deploy the LOCAL warped-citadel-ui container.\n\
\n\
	rip_local		Drop the LOCAL warped-citadel-ui container.\n"


# ------ deploy application ------

deploy_local:
	@echo Deploying LOCAL warped-citadel-ui at $(localappip):$(localappport). Are you sure? [Y/n]
	@read line; if [ ! $$line = "Y" ] && [ ! $$line = "y" ]; then echo Aborting...; exit 1; fi
	
	@echo "Building image $(IMAGE_NAME)..."
	docker build -t $(IMAGE_NAME) .
	
	@echo "Building container warped-citadel-ui..."
	docker compose up



# ------ rip and deploy application ------
rip_deploy_local:
	@echo Ripping and redeploying LOCAL warped-citadel-ui at $(localappip):$(localappport). Are you sure? [Y/n]
	@read line; if [ ! $$line = "Y" ] && [ ! $$line = "y" ]; then echo Aborting...; exit 1; fi
	
	@echo "Stopping $(CONTAINER_NAME)..."
	docker compose down
	
	@echo "Building image $(IMAGE_NAME)..."
	docker build -t $(IMAGE_NAME) .
	
	@echo "Building container warped-citadel-ui..."
	docker compose up



# ------ rip application ------
rip_local:
	@echo Ripping LOCAL warped-citadel-ui at $(localappip):$(localappport). Are you sure? [Y/n]
	@read line; if [ ! $$line = "Y" ] && [ ! $$line = "y" ]; then echo Aborting...; exit 1; fi
	
	@echo "Stopping and removing container warped-citadel-ui..."
	-docker stop $(CONTAINER_NAME)
	-docker rm $(CONTAINER_NAME)
	
	@echo "Removing image $(IMAGE_NAME)..."
	-docker rmi -f $(IMAGE_NAME)