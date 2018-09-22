# Blockchain for Disaster Management

Contents
1. Overview
2. Business Logic
3. Developer Guide

## Overview

[overview](https://raw.githubusercontent.com/captain-red-baron/disastermgmt/doc/blockchain_disaster.pdf)

In case of a natural desaster nothing is more important than clear communication and coordination between all entities participation in helping. The propused network ensures an untrusted decentralized Hyperledger blockchain implementation of that scenario.

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


