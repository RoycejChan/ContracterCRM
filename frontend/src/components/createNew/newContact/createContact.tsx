
const backendURL = 'http://localhost:3000';

import CreateNewNav from "../createNav/createNav"
import "./newContact.css"

import { Input } from '@chakra-ui/react'
import { Stack } from "@chakra-ui/react"

import pfp from "../../../assets/otherpfp.png"

export default function CreateContact() {

    async function check() { 
        try {
            const response = await fetch(`${backendURL}/Contacts`);
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
    }

    return (
        <>

           <CreateNewNav page="Contact"/> 

        <div className="new-container">
            <div className="new-PFP">
                <h1 className="text-2xl">Contact Image</h1>
                <div className="contactpfp">
                    <img src={pfp} alt="PFP" />
                </div>
            </div>
            <div className="newContact">
                <h1 className="text-2xl mb-4">Contact Information</h1>
                <div className="newContactInfo flex justify-between">
                <Stack spacing={6}>
                    <Input placeholder='First Name' size='lg' width="40rem"/>
                    <Input placeholder='Account Name' size='lg' width="40rem"/>
                    <Input placeholder='Email' size='lg' width="40rem"/>
                    <Input placeholder='Work Phone' size='lg' width="40rem"/>
                    <Input placeholder='Mobile Phone' size='lg' width="40rem"/>
                    <Input placeholder='Assistant Name' size='lg' width="40rem"/>
                </Stack>
                <Stack spacing={6}>
                    <Input placeholder='Last Name' size='lg' width="40rem"/>
                    <Input placeholder='Title' size='lg' width="40rem"/>
                    <Input placeholder='Department' size='lg' width="40rem"/>
                    <Input placeholder='Fax' size='lg' width="40rem"/>
                    <Input placeholder='Date of Birth' size='lg' width="40rem" type="date"/>
                    <Input placeholder='Asst Phone' size='lg' width="40rem"/>

                </Stack>
                <button onClick={()=>check()}>check connection</button>
                </div>
            </div>
        </div>
        </>
    ) 
}