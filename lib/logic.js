/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */


/**
 * CreatePart transaction
 * @param {org.acme.electronicbuilder.electronicproduct.CreatePart} tx
 * @transaction
 */
async function createPart(tx) {
    
    const factory = getFactory();
    const namespace = 'org.acme.electronicbuilder.electronicproduct';
    const parts = factory.newResource(namespace, 'Parts', tx.partId);
    parts.partName = tx.partName;
    parts.partPrice = tx.partPrice;
    parts.description = tx.description;
    parts.isActive = false;

    //save the order
    const partsAssetRegistry = await getAssetRegistry('org.acme.electronicbuilder.electronicproduct.Parts');
    await partsAssetRegistry.add(parts);
    
}


/**
 * CreateProduct transaction
 * @param {org.acme.electronicbuilder.electronicproduct.CreateProduct} tx
 * @transaction
 */
async function createProduct(tx) {
    
    const factory = getFactory();
    const namespace = 'org.acme.electronicbuilder.electronicproduct';
    const product = factory.newResource(namespace, 'Product', tx.productId);
    product.productName = tx.productName;
    product.description = tx.description;
    product.isActive = false;

    //save the order
    const productAssetRegistry = await getAssetRegistry('org.acme.electronicbuilder.electronicproduct.Product');
    await productAssetRegistry.add(product);
    
}


/**
 * AddProductParts transaction transaction
 * @param {org.acme.electronicbuilder.electronicproduct.AddProductParts} tx
 * @transaction
 */
async function addProductParts(tx) {
    //Generate new relationship
    const factory = getFactory();
    const namespace = 'org.acme.electronicbuilder.electronicproduct';
    
    //Build array and loop passed in array parameter to build proper relationship path
    let partArray = [];
    for(i = 0; i < tx.parts.length; i++) {
        let partRelationship = factory.newRelationship(namespace, 'Parts', tx.parts[i])
        partArray.push(partRelationship);
    }

    //calculate costPrice from number of parts
    const partsAssetRegistry = await getAssetRegistry(namespace+'.Parts');
    let calculateCostPrice = 0.0;
    
    for(i=0; i < tx.parts.length; i++) {
        let currentPart = await partsAssetRegistry.get(tx.parts[i]);
        calculateCostPrice = calculateCostPrice + currentPart.partPrice;
    }

    // Update the asset with the new value.
    tx.asset.parts = partArray;
    tx.asset.costPrice = calculateCostPrice;
    

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.acme.electronicbuilder.electronicproduct.Product');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.asset);
}


/**
 * UpdateProductByBusinessGroup transaction
 * @param {org.acme.electronicbuilder.electronicproduct.UpdateProductByBusinessGroup} tx
 * @transaction
 */
async function updateProductByBusinessGroup(tx) {
    const factory = getFactory();
    const namespace = 'org.acme.electronicbuilder.electronicproduct';

    //Ternary operations for transaction api conditional updates
    tx.asset.productName = (tx.productName.length !== 0 ? tx.productName : tx.asset.productName);
    tx.asset.description = (tx.description.length !== 0 ? tx.description : tx.asset.description);
    tx.asset.isActive = tx.isActive;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.acme.electronicbuilder.electronicproduct.Product');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.asset);
}


 /**
 * CreateOrder transaction
 * @param {org.acme.electronicbuilder.electronicproduct.CreateOrder} tx
 * @transaction
 */
async function createOrder(tx) {

    const factory = getFactory();
    const namespace = 'org.acme.electronicbuilder.electronicproduct';
    const order = factory.newResource(namespace, 'Orders', tx.orderId);
    //form product relationship path
    order.product = factory.newRelationship(namespace, 'Product', tx.productId);
    order.quantity = tx.quantity;
    order.orderStatus = "Requested";

    //form buyer relationship path
    const participantNamespace = 'org.acme.electronicbuilder.participant';
    const currentParticipant = getCurrentParticipant().getIdentifier();
    order.buyer = factory.newRelationship(participantNamespace, 'Buyer', currentParticipant);
    
    //add the order to ledger
    const ordersAssetRegistry = await getAssetRegistry('org.acme.electronicbuilder.electronicproduct.Orders');
    await ordersAssetRegistry.add(order);

    // Emit an event for the modified asset.
    /*let event = getFactory().newEvent('org.acme.electronicproduct', 'SampleEvent');
    event.asset = tx.asset;
    event.oldValue = oldValue;
    event.newValue = tx.newValue;
    emit(event);*/
}


/**
 * SetOrderPrice transaction
 * @param {org.acme.electronicbuilder.electronicproduct.SetOrderPrice} tx
 * @transaction
 */
async function setOrderPrice(tx) {
    const factory = getFactory();

    tx.asset.buyerCost = tx.buyerCost;
    tx.asset.orderStatus = 'Pending';

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.acme.electronicbuilder.electronicproduct.Orders');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.asset);
}


/**
 * AcceptOrderCost transaction
 * @param {org.acme.electronicbuilder.electronicproduct.AcceptOrderCost} tx
 * @transaction
 */
async function acceptOrderCost(tx) {
    const factory = getFactory();

    tx.asset.orderStatus = 'Complete';

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.acme.electronicbuilder.electronicproduct.Orders');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.asset);
}

 
/*
Delete Line above if you want to use the below transactions

/**
 * Sample transaction
 * @param {org.acme.electronicproduct.SampleTransaction} sampleTransaction
 * @transaction
 */

 /*
async function sampleTransaction(tx) {
    // Save the old value of the asset.
    const oldValue = tx.asset.value;

    // Update the asset with the new value.
    tx.asset.value = tx.newValue;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.acme.electronicproduct.SampleAsset');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.asset);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('org.acme.electronicproduct', 'SampleEvent');
    event.asset = tx.asset;
    event.oldValue = oldValue;
    event.newValue = tx.newValue;
    emit(event);
}*/
