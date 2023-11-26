

import CreateNewNav from "../createNav/createNav"

import { Input } from '@chakra-ui/react'
import { Stack } from "@chakra-ui/react"

import pfp from "../../../assets/otherpfp.png"

export default function CreateLead() {

    return (
        <>

           <CreateNewNav page="Lead"/> 

        <div className="new-container">
            <div className="new-PFP">
                <h1 className="text-2xl">Contact Image</h1>
                <div className="contactpfp">
                    <img src={pfp} alt="PFP" />
                </div>
            </div>
            <div className="newContact">
                <h1 className="text-2xl mb-4">Lead Information</h1>
                <div className="newContactInfo flex justify-between">
                <Stack spacing={6}>
                    <Input placeholder='First Name' size='lg' width="40rem"/>
                    <Input placeholder='Title' size='lg' width="40rem"/>
                    <Input placeholder='Business Phone' size='lg' width="40rem"/>
                    <Input placeholder='Business Phone' size='lg' width="40rem"/>
                    <Input placeholder='Mobile Phone' size='lg' width="40rem"/> 
                    <Input placeholder='Lead Source' size='lg' width="40rem"/>{/*select drop down*/}
                    <Input placeholder='Industry' size='lg' width="40rem"/>{/*select drop down*/}
                    <Input placeholder='Annual Revenue' size='lg' width="40rem"/>
                </Stack>
                <Stack spacing={6}>
                    <Input placeholder='Last Name' size='lg' width="40rem"/>
                    <Input placeholder='Company' size='lg' width="40rem"/>
                    <Input placeholder='Email' size='lg' width="40rem"/>
                    <Input placeholder='Fax' size='lg' width="40rem"/>
                    <Input placeholder='No. of Employees' size='lg' width="40rem" type="date"/>
                    <Input placeholder='Lead Status' size='lg' width="40rem"/>
                    <Input placeholder='Lead Status' size='lg' width="40rem"/>
                    <Input placeholder='Rating' size='lg' width="40rem"/> {/*Dropdown*/}

                </Stack>
                </div>
            </div>
        </div>
        </>
    ) 
}