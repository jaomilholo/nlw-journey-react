import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";
import { CreateLinksModal } from "./create-links";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";


interface NewLinks {
  links: {
    id: string
    title: string
    url: string
  }[]
}

export function ImportantLinks() {
  const [isCreateLinksModalOpen, setIsCreatelinksModalOpen] = useState(false)

  const { tripId } = useParams()
  const [link, setLink] = useState<NewLinks[]>([])

  useEffect(() => {
    api.get(`/trips/${tripId}/links`).then(response => setLink(response.data.links))
  }, [tripId])


  function openCreateLinksModal() {
    setIsCreatelinksModalOpen(true)
  }
  
  function closeCreateLinksModal() {
    setIsCreatelinksModalOpen(false)
  }
  return (

    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>
      {link.map(category => {
        return(
          <div key={category.link} className="space-y-2.5">
              <div className="space-y-5">
                <div className="flex items-center justify-between gap-1">
                      <div className="space-y-1.5">
                        <span className="block font-medium text-zinc-100">{category.title}</span>
                        <a href="#" className="block text-xs text-zinc-400 truncate hover:text-zinc-200">
                          {category.url}
                        </a>
                        
                      </div>
                      <Link2 className="text-zinc-400 size-5 shrink-0"/>
                </div>
              </div>
          </div>
        )
      })}



      {/* <div className="space-y-5">
        <div className="flex items-center justify-between gap-1">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">Reserva do AirBnB</span>
            <a href="#" className="block text-xs text-zinc-400 truncate hover:text-zinc-200">
              https://www.notion.com/pages/1047000112354648336?adults=13&children=0&infants=0&pets=0&wishlist_item_id=11003621872995&check_in=2024-08-17&check_out=2024-08-26&source_impression_id=p3_1717600906_P3DL0E-bJZzguEci&previous_page_section_name=1000
            </a>
          </div>
          <Link2 className="text-zinc-400 size-5 shrink-0"/>
        </div>

        <div className="flex items-center justify-between gap-1">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">Reserva do AirBnB</span>
            <a href="#" className="block text-xs text-zinc-400 truncate hover:text-zinc-200">
              https://www.notion.com/pages/1047000112354648336?adults=13&children=0&infants=0&pets=0&wishlist_item_id=11003621872995&check_in=2024-08-17&check_out=2024-08-26&source_impression_id=p3_1717600906_P3DL0E-bJZzguEci&previous_page_section_name=1000
            </a>
          </div>
          <Link2 className="text-zinc-400 size-5 shrink-0"/>
        </div>
      </div> */}

      <Button onClick={openCreateLinksModal} variant="secondary" size="full">
        <Plus className="size-5"/>
        Cadastrar novo link
      </Button>
    
      {isCreateLinksModalOpen && (
        <CreateLinksModal closeCreateLinksModal={closeCreateLinksModal}/>
      )}
    </div>
  )
}