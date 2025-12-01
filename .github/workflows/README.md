# GitHub Actions

## Generate Access Token
Generates a temporary access token that can be used to push and pull docker images from the projects GCP artifact registry. The workflow must be run manually using the `Run workflow` button in the GitHub Actions GUI. 

After the action is run, the access token is printed during the **Generate access token** step. Copy the token and enter when prompted during the `make auth` command.

## Build and Push
Builds custom docker images as defined in the docker compose file and pushes them to the projects corresponding gcp project's artifact repo. Takes in line as an input parameter, defaults to `default`. It will use the docker compose file and docker platform associated with that line. 

The action is able to generate both x86 and arm images. 

The images generated through the action are given the tag `dev-{RUN NUMBER}` and `latest` before getting pushed to GCP.