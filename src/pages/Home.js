import { Fragment } from 'react'

import { nowReleased, comicNew, completed, home, comingSoon } from '../api/'
import Slides from '../layout/components/Slides';
import Comics from '../layout/components/Comics';

function Home() {
    return (
        <Fragment>
            <Slides api={home}/>
            <Comics api={comicNew}/>
            <Comics api={comingSoon}/>
            <Comics api={nowReleased}/>
            <Comics api={completed}/>
        </Fragment>
     );
}

export default Home;