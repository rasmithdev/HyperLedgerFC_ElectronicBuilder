# Hyperledger Fabric Electronic Builder
This is a proof of concept project demonstrating how assets, participants, and transactions can be used to create a basic business network with Hyperledger Composer. The Electronic Builder business network demonstrates the lifecycle of a product being requested, engineers designing it, and buyers ordering the product.

The idea behind this blockchain prototype is to demonstrate a network that could be applied to a consortium of electronic part manufacturers such as https://www.ecianow.org/. I am still updating the network with new models and transactions. I need to better model the EngineerGroup and BusinessGroup participants so that provenance/origin of parts is better represented for a consortium of manufacturers. Additional permissions in the access control list (ACL) will then be added.


### Prerequisites
In order to successfully run the electronic builder POC, one should have a basic understanding of how to use the Hyperledger Composer Playground. If this is your first time, I recommend getting started with the Composer Playground by using the following tutorial. https://hyperledger.github.io/composer/latest/tutorials/playground-tutorial.html


### Install
- Navigate to http://composer-playground.mybluemix.net/login and select "Deploy a new business network"
- Click the "Drop here to upload or browse" icon. Inside of the "dist" folder of this repository. Select electronicbuilder@0.0.1.bna
- Select Deploy the network

### Setup
In the future I intend to create a setup transaction method, but for now you must create the asset and participants resources records manually.

- Create participants and issue ID's for for BusinessGroup, EngineerGroup, and Buyer resources.

### Running the business network process
- As a BusinessGroup participant, create a new product using the "CreateProduct" transaction.
- As an EngineerGroup participant, create parts using the "CreatePart" transaction.
- As an EngineerGroup participant, add the created parts to an existing Product with the "AddProductParts" transaction.
- As a BusinessGroup participant, update the product and set it active with the "UpdateProductByBusinessGroup" transaction.
- As a Buyer participant, order an active product using the "CreateOrder" transaction.
- As a BusinessGroup participant, set the order price using the "SetOrderPrice" transaction.
- As a Buyer participant, accept the order price with the "AcceptOrderCost" transaction.

