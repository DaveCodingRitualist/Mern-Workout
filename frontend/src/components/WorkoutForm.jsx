import { useWorkoutsContext } from "../hooks/useWorkoutContext"
import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    if (!user) {
      setIsLoading(false)
      setError('You must be logged in')
      return
    }

    const workout = {title, load, reps}

    const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/workouts`, {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()
 
    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setIsLoading(false)
      setTitle('')
      setLoad('')
      setReps('')
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_WORKOUT', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3 className="add-title">Add a Workout</h3>
      <label>Exercise Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />
      <label>Load (in kg):</label>
      <input 
        type="number" 
        onChange={(e) => setLoad(e.target.value)} 
        value={load}
        className={emptyFields.includes('load') ? 'error' : ''}
      />
      <label>Number of Reps:</label>
      <input 
        type="number" 
        onChange={(e) => setReps(e.target.value)} 
        value={reps} 
        className={emptyFields.includes('reps') ? 'error' : ''}
      />
      {!isLoading && <button>Add Workout</button>}
      {isLoading && <button disabled>Adding workout...</button>}
      {error && <div className="error">{error}</div>}
    </form>
  )
}
export default WorkoutForm