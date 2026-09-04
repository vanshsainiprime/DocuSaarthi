import { bankAccountRequirements } from '../data/bankAccountRequirements'
import RequirementCard from '../components/RequirementCard'

function BankAccountRequirements() {
  return (
    <main>
      <h2>Bank Account Opening</h2>
      <p>Documents required for this application</p>

      {bankAccountRequirements.map((requirement) => (
        <RequirementCard
          key={requirement.name}
          name={requirement.name}
          description={requirement.description}
          status={requirement.status}
          onStatusChange={() => {}}
        />
      ))}
    </main>
  )
}

export default BankAccountRequirements