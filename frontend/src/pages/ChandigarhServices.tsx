import './Services.css'
import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import ServiceCard from '../components/ServiceCard'
import { chandigarhServices } from '../data/chandigarhServices'

function ChandigarhServices() {
  const [search, setSearch] = useState('')

  const filteredServices =
    chandigarhServices.filter((service) =>
      service.name
        .toLowerCase()
        .includes(search.toLowerCase()),
    )

  return (
    <main className="services-page">
      <section className="services-intro">
        <p className="eyebrow">
          GOVERNMENT SERVICES
        </p>

        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search services..."
        />

        <h2>
          Chandigarh
        </h2>

        <p>
          Find government services for
          Chandigarh.
        </p>
      </section>

      <section className="services-list">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              name={service.name}
              description={service.description}
              requirementCount={
                service.requirementCount
              }
              path={service.path}
            />
          ))
        ) : (
          <p>
            No services found.
          </p>
        )}
      </section>
    </main>
  )
}

export default ChandigarhServices
