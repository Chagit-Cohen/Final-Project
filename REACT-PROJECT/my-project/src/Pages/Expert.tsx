import { useParams } from "react-router"

const Expert = () => {

  const { id } = useParams()

  return (

    <div>

      <h1>עמוד מומחה</h1>

      <p>מספר מומחה: {id}</p>

      <p>כאן יוצגו פרטי המומחה</p>

    </div>

  )
}

export default Expert