import { Button, Stack } from '@chakra-ui/react'
import "./createNav.css"


export default function CreateNewNav({ page }:any) {
    return (
        <>
            <div className="createNewNav flex justify-between">
                <h1 className='text-2xl'>Create {page}</h1>

                <Stack spacing={4} direction='row' align='center'>
                    <Button size='md'>
                        Cancel
                    </Button>
                    <Button colorScheme='blue' size='md'>
                        Save
                    </Button>
                </Stack>

            </div>

        </>
    )
}