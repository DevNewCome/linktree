import { Link,  useParams } from 'react-router-dom'

export default function Produto(){

    const {id} = useParams()

    return(
        <div>
            Produto {id}
        </div>
    )
}