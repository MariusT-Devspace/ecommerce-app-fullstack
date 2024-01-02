import { ThemeColor } from "src/app/constants";
import { IconButtonType } from "./icon-button-type.enum";
import { MaterialIcon } from "./material-icons.enum";

interface Icon {
    iconName: string,
    svgIcon: MaterialIcon
}

export interface IconButton {
    icon: Icon | undefined,
    matButtonType: IconButtonType,
    color: ThemeColor | undefined
}