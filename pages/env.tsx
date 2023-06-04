export default function Env() {
  return (
    <div className="container">

      <h1>Env</h1>

      <p>{process.env.DB_USERNAME}</p>
    </div>
  )
}