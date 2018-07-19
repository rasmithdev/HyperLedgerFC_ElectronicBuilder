# Hyperledger Fabric Electronic Builder
This is proof of concept project demonstrating how assets, participants, and transactions can be used to create a basic business network with Hyperledger Composer. The Electronic Builder business network demonstrates the lifecycle of a product being requested, engineers designing it, and buyers ordering the product.

### Prerequisites
In order to successfully run the electronic builder POC, one should have a basic understanding of how to use the Hyperledger Composer Playground. If this is your first time, I recommend getting started with the Composer Playground by using the following tutorial. https://hyperledger.github.io/composer/latest/tutorials/playground-tutorial.html


### Install
- Navigate to http://composer-playground.mybluemix.net/login and select "Deploy a new business network"
- Click the "Drop here to upload or browse" icon. Inside of the "dist" folder of this repository. Select electronicbuilder@0.0.1.bna
- Select Deploy the network

### Setup
- Create participants and issue ID's in the participant resources for BusinessGroup, Buyer, EngineerGroup
- As an BusinessGroup user. create a new product using the "CreateProduct" Transaction.
- As an EngineerGroup user. Create parts using the "CreatePart" Transaction