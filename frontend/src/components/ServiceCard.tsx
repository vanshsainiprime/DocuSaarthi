import './ServiceCard.css'
import { useNavigate } from 'react-router-dom'

type ServiceCardProps = {
  name: string
  description: string
  requirementCount: number
  path: string
}

function ServiceCard({ name, description, requirementCount, path, }: ServiceCardProps) {
  const navigate = useNavigate()

  return (
    <div className="service-card">
      <h3>{name}</h3>

      <p>{description}</p>

      <p className="requirement-count">
        {requirementCount} requirements
      </p>

      <button
        className="start-button"
        type="button"
        onClick={() => navigate(path)}
      >
         View Requirements → 
      </button>
    </div>
  )
}

export default ServiceCard