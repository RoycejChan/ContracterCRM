import {useLocation} from 'react-router-dom';

export default function Contact() {
    
    const location = useLocation();

    // const contact = location.state;

    console.log(location.state);
    return(
        <>

        <div className="background">
            <div className="overviewDetails">
                <ul className='flex flex-col gap-6 overviewDetails-header'>
                    <li className='overviewDetail'>
                        Email <span className='email'>{location.state.contact.Email}</span>
                    </li>
                    <li className='overviewDetail'>
                        Phone <span>{location.state.contact.WorkPhone}</span>
                    </li >
                    <li className='overviewDetail'>
                        Mobile <span>{location.state.contact.MobilePhone || '—'}</span>
                    </li>
                    <li className='overviewDetail'>
                        Department <span>{location.state.contact.Department}</span>
                    </li>
                </ul>
            </div>
            
        </div>



        </>
    )

}