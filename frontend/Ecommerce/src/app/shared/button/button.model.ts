import { ThemeColor } from "src/app/constants";
import { ButtonType } from "./button-type.enum";
import { MaterialIcon } from "./material-icons.enum";

interface Icon {
    iconName: string,
    svgIcon: MaterialIcon
}

export interface Button {
    icon: Icon | undefined,
    ariaLabel: string,
    text: string,
    matButtonType: ButtonType,
    color: ThemeColor | undefined
}