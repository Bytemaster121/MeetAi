import { DEFAULT_PAGE } from "@/constant";
import {parseAsInteger , parseAsString , useQueryStates } from "nuqs";
export const useAgentFilters = () => {
    return useQueryStates({
        page: parseAsInteger.withDefault(DEFAULT_PAGE).withOptions({clearOnDefault: true}),
        search: parseAsString.withDefault("").withOptions({clearOnDefault: true}),
    })
};
//NUGS is basically a used to syncronize to our serach params in the url
//localhost:3000/?serach== hello <==> useState("hello")
//What Is “NUGS” in This Context?
// While “NUGS” isn’t a standard acronym, it sounds like you're using it as shorthand for:
// Next.js URL Global State sync — or a custom hook/pattern that syncs useState with URLSearchParams.





