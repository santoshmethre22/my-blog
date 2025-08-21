import React from 'react'

import {Container} from "../Components/index.js"
import { PostFrom } from '../Components/index.js'

function AddPost() {
  return (
    <div className='py-8'>
         <Container>
            <PostFrom />
        </Container> 
    </div>
  )
}

export default AddPost