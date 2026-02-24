import FbIcon from "../../../icons/FbIcon"
import IgIcon from "../../../icons/IgIcon"
import LinkedIcon from "../../../icons/LinkedIcon"
import TiktokIcon from "../../../icons/TiktokIcon"

export default function SocialIcon() {
    const icons = [
        { href: "https://www.facebook.com/share/1EArSK2cgJ/?mibextid=wwXIfr", Icon: FbIcon, title: "Facebook" },
        { href: "https://www.linkedin.com/company/ideiperu-seguridad-comercial-e-industrial/", Icon: LinkedIcon, title: "LinkedIn" },
        { href: "https://www.instagram.com/idei_seguridad_industrial", Icon: IgIcon, title: "Instagram" },
        { href: "https://www.tiktok.com/@idei.seguridadindustrial?_t=ZS-8z6Jy5Anbto&_r=1", Icon: TiktokIcon, title: "Tiktok" }
    ]
    return (
        <div className="flex space-x-4 m-2 flex-wrap gap-2">
            {icons.map((icon) => (
                <a
                    key={icon.title}
                    href={icon.href}
                    title={icon.title}
                    className="bg-white rounded-full p-2 hover:scale-105 transition"
                >
                    <icon.Icon className="text-orange-600" />
                </a>
            ))}
        </div>
    )
}