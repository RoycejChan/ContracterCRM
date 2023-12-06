
import { useState } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import { Button, Stack } from '@chakra-ui/react'

export default function Contact() {
    
    const navigate = useNavigate();
    const location = useLocation();
    const contact = location.state.contact;

    const [isVisible, setIsVisible] = useState(false);

    const goBack = () => {
        navigate(-1);
    }
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
      };


    return(

        <>

            <div className="contactPageHeader">
                <div className="leftSide-contactPageHeader">
                    <button onClick={()=>{goBack()}} className='backBtn'>⬅️</button>
                    <h1>{contact.FirstName} {contact.LastName}</h1>
                </div>
                <div className="rightSide-contactPageHeader">
                <Stack direction='row' spacing={4} align='center'>
                        <Button colorScheme='twitter' variant='solid' size='lg' className="filterButtons">
                        Send Email
                        </Button>
                        <Button colorScheme='gray' variant='solid' size='lg' className="filterButtons" onClick={()=>deleteRecord()}>
                        Delete
                        </Button>
                </Stack>
                </div>
            </div>




            <div className="overviewDetails">
                <ul className='flex flex-col gap-6 overviewDetails-header'>
                    <li className='overviewDetail'>
                        Email <span className='email'>{contact.Email}</span>
                    </li>
                    <li className='overviewDetail'>
                        Phone <span>{contact.WorkPhone}</span>
                    </li >
                    <li className='overviewDetail'>
                        Mobile <span>{contact.MobilePhone || '—'}</span>
                    </li>
                    <li className='overviewDetail'>
                        Department <span>{contact.Department}</span>
                    </li>
                </ul>
            </div>

            <div className="allDetails">
                <div className="showDetails">
                     <button onClick={toggleVisibility}>{isVisible ? 'Hide Details' : 'Toggle Details'}</button>
                </div>  
            <div className={`allDetails-list ${isVisible ? 'visible' : ''}`}>
                <ul className='allDetails-col'>
                    <li>
                        Account Name <span>{contact.AccountName}</span>
                    </li>
                    <li>
                        Email <span className='email'>{contact.Email}</span>
                    </li>
                    <li>
                         Work Phone<span>{contact.WorkPhone}</span>
                    </li>
                    <li>
                         Mobile Phone<span>{contact.MobilePhone  || '—'}</span>
                    </li>
                    <li>
                        Fax <span>{contact.Fax  || '—'}</span>
                    </li>
                    <li>
                        Assistant Name <span>{contact.AssistantName  || '—'}</span>
                    </li>
                </ul>
                <ul className='allDetails-col'>
                    <li>
                        Contact Name  <span>{contact.FirstName} {contact.LastName}</span>
                    </li>
                    <li>
                        Department  <span>{contact.Department}</span>
                    </li>
                    <li>
                         Title <span>{contact.Title}</span>
                    </li>
                    <li>
                        Assistant Phone  <span>{contact.AssistantPhone  || '—'}</span>
                    </li>

                </ul>
                </div>
            </div>
            



        </>
    )

}