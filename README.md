# Blockchain for Disaster Management

Contents
1. Overview
2. Business Logic
3. Developer Guide
4. Extendability
5. Full Example

## Overview

[Illustration can be found in the doc folder](disastermgmt/doc/blockchain_disaster.png)

In case of a natural desaster nothing is more important than clear communication and coordination between all entities participation in helping. The propused network ensures an untrusted decentralized Hyperledger blockchain implementation of that scenario.

## Business Logic

In the network there are three different participants:
* Aid Organizations: these organizations (Unicef, Red Cross, etc.) help at a disaster location by providing ressources of any kind.
* Coordination Checkpoints: along a big disaster area there are several places where aid ressources are gathered. This could be a camp for example. They keep track on arriving ressources.
* Coordinators: these actors can move freely around the whole disaster area. Their purpose is to monitor and observe the area. The make request for aid ressources, which will then be delivered to aid check points later.

In this network we have only one asset:
* Aid Request: Coordinators are issuing several aid requests for a specific aid ressource. For example coordinator Peter Helper sees that there are people trapped inside a broke down house and one of them is bleeding. He makes an Aid Request for one doctor and two volunteers to the nearest check point and clears the situation. He goes to the checkpoint and escort the doctor and volunteers to the broke down house to solve the situation.

In our example aid ressources are: volunteers, doctors, food containers, drink containers, trucks, vans and drones.

The following transactions in the network are possible:
* Create Aid Request: A request for a specific amount of an aid ressource. Done by: coordinators
* Send Aid Ressources: Starting the relocation of a specific help ressource to a checkpoint. Done by: Aid Organization
* Confirm Ressource Arrival: Confirming the arrival of an requested ressource at a check point. Done by: Coordination check point
* Cancel Aid Request: Cancellation of an aid request in case the aid ressources are not needed anymore. Done by: Coordinators
* Lost Pending Request: Mark pending ressources as lost, so that new ressources an be dedicated to  the aid request. Done by: coordinator.

## Developer Guide

This blockchain approach to the provided scenario of disaster management is build upon Hyperledger. For development Hyperledger composer and Hyperledger Fabric are useful tools. Composer gives a simple CLI for basic interactions and Fabric lets you host an own network on your local machine. There are very good guides at https://hyperledger.github.io/composer/v0.19/introduction/introduction.html available. Another useful tutorial is the one from IBM which can be found here: https://www.ibm.com/developerworks/cloud/library/cl-model-test-your-blockchain-network-with-hyperledger-composer-playground/index.html. 

For quick testing an playing with the implementation https://composer-playground.mybluemix.net/editor is a simple solution. there the provided .bna files only need to be uploaded.

## Extendability
The network is extendible within the borders of the use case. The blockchain is the single source of truth until a certain degree since different parties are verifying (check arrival, check lost) different parts of the transactional network. It can easily be extended with more actors or transactions.

## Full Example:
The following full example starts with everything being provided in disaster-mgmt@0.0.1.bna. 

* To start: load the disaster-mgmt@0.0.1.bna from the archives folder into the playground
* Go to test > Submit Transactions > Setup Demo. This sets up the following scenario: An earthquake happened. There is one coordinator called Peter Helper on the disaster area. In the area are 3 checkpoints: the bridge, the farm and the forest. Helper Inc and the Big Aid NGO have promised help and are all waiting for new requests by the coordinator on site.
* Next we are getting around to test some transactions out.
* Peter helper sees that at the farm there is a house broke down. Three people are trapped and one is bleeding at the head. Since he cannot solve the situation on his own, Peter Helper creates two new aid requests: DoctorNeededForFarm (1 doctor) and VolunteersNeededForFarm (2 Volunteers) to get the people out of their trap and provide medical support to them. To follow along create these 2 transactions in the composer-playground.
* Helper Inc has a doctor available and sends him to the check point near the farm. 
* Big Aid NGO's sees the requests as well and sends 2 Volunteers to the checkpoint.
* The doctor arrives at the farm checkpoint. The checkpoint volunteers mark him as arrived and Peter helper escorts him the to broke down house.
* Meanwhile the van with the 2 Volunteers from Big Aid NGO gets stuck in traffic on the way to the disaster area.
* Peter Helper recognizes the missing volunteers and marks them as lost.
* Meanwhile Peter and the Doctor recognize that they are able the save the people from the broke down house without the support of anyone else. They help them get out and provide medical support.
* Peter does not need any other volunteers anymore and cancels the request.

In the end everybody survives.

## Additional Information
This project has been done for a call for code hackathon (https://www.topcoder.com/challenges/30070720?utm_source=Topcoder%20Members&utm_campaign=600762965c-EMAIL_CAMPAIGN_2018_04_17_COPY_01&utm_medium=email&utm_term=0_28bfd3c062-600762965c-124449513&tab=details). I learned a lot about the Hyperledger Framework and how to apply it. If you have any other questions feel free to contact me at any point in time.


