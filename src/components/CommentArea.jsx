import { useEffect, useState } from 'react'
import CommentList from './CommentList'
import AddComment from './AddComment'
import Loading from './Loading'
import Error from './Error'

const CommentArea =(props)=>{

    const [comments,setComments] = useState([]);
    const [isLoading,setIsloading] = useState(false);
    const [isError,setIserror] = useState(false);

    useEffect(
        () =>{
            fetchIt();
        },[props.asin]
    )

    const fetchIt = async () => {
            setIsloading(true)
            try {
                let response = await fetch('https://striveschool-api.herokuapp.com/api/comments/' + props.asin, {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGI3OWY5NTgxNmI1YjAwMTU5NDA3NDAiLCJpYXQiOjE2MjI2NDY2NzcsImV4cCI6MTYyMzg1NjI3N30.y-rBwB5WAQOWBvWrLlAgTQUrbGulxd2M6cWH3VLyGLw'
                    }
                })
                console.log(response)
                if (response.ok) {
                    let comments = await response.json()
                    setComments(comments) 
                    setIsloading(false)
                    setIserror(false)
                } else {
                    console.log('error')
                    setIsloading(false) 
                    setIserror(true)
                }
            } catch (error) {
                console.log(error)
                setIsloading(false) 
                setIserror(true)
            }
    }

        return (
            <div>
                {isLoading && <Loading />}
                {isError && <Error />}
                <AddComment asin={props.asin} />
                <CommentList commentsToShow={comments} />
            </div>
        )
    }

export default CommentArea