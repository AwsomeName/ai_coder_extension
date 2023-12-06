import getDocumentLangId from "./getDocumentLangId";
import { Uri } from "vscode";
import { navUri } from "./navUri";
import { addSignal, andSignal, myScheme } from "../param/constparams";

//generate uri for translation mode
export const aicoderCodeTranslation = async (
    dstLang: string,
    translationRes: string,
    commandid: string
) => {
    let documentLangId;
    documentLangId = getDocumentLangId(dstLang);
    let uri = Uri.parse(
        `${myScheme}:AiCoder_translation?loading=false&mode=translation&commandid=${commandid}&translation_res=${translationRes
            .replaceAll("+", addSignal)
            .replaceAll("&", andSignal)}`,
        true
    );

    await navUri(uri, documentLangId, "AiCoder_translation");
};
