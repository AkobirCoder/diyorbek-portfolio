import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Til-bilan-ishlaydigan navigatsiya primitivlari.
 * Link, useRouter, usePathname — joriy tilni avtomatik saqlaydi.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
