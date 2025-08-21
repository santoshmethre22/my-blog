import React, { useEffect, useState } from 'react'


import {Container, PostFrom} from '../Components/index.js'

import appwriteService from "../appwrite/config";
import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {

    const {slug}=useParams(   )
    const navigate=useNavigate();
    const [post ,setPost]=useState("    ")

    useEffect(()=>{

        if(slug){

            appwriteService.getPost(slug).then((post)=>
            {
                    if(post){
                        setPost(post)
                    }
            }
            
        )
        }else{
 navigate('/')
        }

    },[slug, navigate])
 return post ? (
    <div className='py-8'>
        <Container>
            <PostFrom post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost
