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
 * Sending of an aid ressource to an AirRequest check point
 * @param {com.muellermarcel.disastermgmt.SendAidRessource} sendAidRessource
 * @transaction
 */
async function sendAidRessource(tx) {
    // Save the old value of the asset.
    const oldPending = tx.asset.pendingAidRessourceAmount;

    // Check if ressource sent is the right ressource needed and
    // if the needed threshold is not reached yet
    // update accordingly
    if (tx.asset.aidRessource == tx.aidRessource && 
        tx.asset.pendingAidRessourceAmount < tx.asset.neededAidRessourceAmount){
        tx.asset.pendingAidRessourceAmount = tx.asset.pendingAidRessourceAmount + tx.aidAmount;
    }else{
        console.log('Wrong aid ressource sent or threshold already reached');
    }

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('com.muellermarcel.disastermgmt.AidRequest');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.asset);
}

/**
 * Sending of an aid ressource to an AidRequest check point
 * @param {com.muellermarcel.disastermgmt.CreateAidRequest} createAidRequest
 * @transaction
 */
async function createAidRequest(tx){
    const NS = 'com.muellermarcel.disastermgmt';

    // Needed registries
    const aidRequestRegitry = await getAssetRegistry(NS + '.AidRequest'); // eslint-disable-line no-undef
    const coordCkptRegistry = await getParticipantRegistry(NS + '.CoordCkpt')

    // Use a factory for creation a new aid request
    const factory = getFactory(); // eslint-disable-line no-undef
    const aidRequest = factory.newResource(NS, 'AidRequest', tx.aidRequestId);

    // When a new aid request is created its initial status is REQUESTED.
    aidRequest.status = 'REQUESTED';
    aidRequest.aidRessource = tx.aidRessource;
    aidRequest.neededAidRessourceAmount = tx.aidAmount;
    aidRequest.pendingAidRessourceAmount = 0.0;
    aidRequest.receivedAidRessourceAmount = 0.0;

    // Get the check point related to 
    const toCkpt = await coordCkptRegistry.get(tx.coordCkpt.coordCkptId);
    const ckptRef = factory.newRelationship(NS, 'CoordCkpt', toCkpt.coordCkptId);
    aidRequest.coordCkpt = ckptRef;

    await aidRequestRegitry.add(aidRequest);
}

/**
 * Initialize some test assets and participants useful for running a demo.
 * @param {com.muellermarcel.disastermgmt.SetupDemo} setupDemo - the SetupDemo transaction
 * @transaction
 */
async function setupDemo(setupDemo) {
    const factory = getFactory();
    const NS = 'com.muellermarcel.disastermgmt';

    // create a disaster coordinator
    const coordinator = factory.newResource(NS, 'Coordinator', 'Peter Helper');

    // create three checkpoints
    const ckpt_1 = factory.newResource(NS, 'CoordCkpt', 'Bridge');
    const pos_1 = factory.newConcept(NS, 'Position');
    pos_1.lat = 10.0;
    pos_1.long = 20.0;
    ckpt_1.position = pos_1;

    const ckpt_2 = factory.newResource(NS, 'CoordCkpt', 'Farm');
    const pos_2 = factory.newConcept(NS, 'Position');
    pos_2.lat = 25.0;
    pos_2.long = 15.0;
    ckpt_2.position = pos_2;

    const ckpt_3 = factory.newResource(NS, 'CoordCkpt', 'Forest');
    const pos_3 = factory.newConcept(NS, 'Position');
    pos_3.lat = 30.0;
    pos_3.long = 25.0;
    ckpt_3.position = pos_3;

    // create the aid organizations
    const aidOrg_1 = factory.newResource(NS, 'AidOrg', 'Helper Inc');
    const aidOrg_2 = factory.newResource(NS, 'AidOrg', 'Big Aid NGO');

    // add all resources to the registry
    const coordinatorRegistry = await getParticipantRegistry(NS + '.Coordinator');
    await coordinatorRegistry.addAll([coordinator]);

    const ckptRegistry = await getParticipantRegistry(NS + '.CoordCkpt');
    await ckptRegistry.addAll([ckpt_1, ckpt_2, ckpt_3]);

    const aidOrgRegistry = await getParticipantRegistry(NS + '.AidOrg');
    await aidOrgRegistry.addAll([aidOrg_1, aidOrg_2]);
}