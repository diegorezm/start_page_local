import { UserConfigSidebar } from "../features/user_config/components/user_config_sidebar";

import { CreateSectionDialog } from "../features/sections/components/create_section_dialog";
import { UpdateSectionDialog } from "../features/sections/components/update_section_dialog";
import { DeleteSectionDialog } from "../features/sections/components/delete_section_dialog";

import { CreateSectionItemDialog } from "../features/section_items/components/create_section_item_dialog";
import { UpdateSectionItemDialog } from "../features/section_items/components/update_section_item_dialog";
import { DeleteSectionItemDialog } from "../features/section_items/components/delete_section_item_dialog";

export function DialogProviders() {
  return (
    <>
      <UserConfigSidebar />
      <CreateSectionDialog />
      <UpdateSectionDialog />
      <DeleteSectionDialog />

      <CreateSectionItemDialog />
      <UpdateSectionItemDialog />
      <DeleteSectionItemDialog />
    </>
  )
}
