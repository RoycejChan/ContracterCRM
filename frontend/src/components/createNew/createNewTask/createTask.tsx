

import CreateNewNav from "../createNav/createNav"

import { Input } from '@chakra-ui/react'
import { Stack } from "@chakra-ui/react"


export default function CreateTask() {

    return (
        <>

           <CreateNewNav page="Task"/> 

        <div className="new-container">
            <div className="newTask">
                <h1 className="text-2xl mb-4">Task Information</h1>
                <div className="newContactInfo flex justify-between">
                <Stack spacing={6}>
                    <Input variant='flushed' placeholder='Subject' size='lg' width="40rem"/>
                    <Input variant='flushed' placeholder='Account Name' size='lg' width="40rem"/> {/*email, call, meeting, etc., send letter, product demo*/}
                    <Input variant='flushed' placeholder='Due Date' size='lg' width="40rem" type="data"/>
                    <Input variant='flushed' placeholder='Date' size='lg' width="40rem"/>
                    <Input variant='flushed' placeholder='Status' size='lg' width="40rem"/>
                    <Input variant='flushed' placeholder='Priority' size='lg' width="40rem"/>
                    <Input variant='flushed' placeholder='Reminder' size='lg' width="40rem"/>
                    <Input variant='flushed' placeholder='Repeat' size='lg' width="40rem"/>
                </Stack>

                </div>
            </div>
        </div>
        </>
    ) 
}