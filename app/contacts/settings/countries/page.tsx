import { ConfigSubPage } from "@/components/contacts/config-sub-page"

export default function CountriesPage() {
  return (
    <ConfigSubPage
      title="Pays"
      description="Gérez la liste des pays disponibles pour les contacts"
      configKey="countries"
    />
  )
}
