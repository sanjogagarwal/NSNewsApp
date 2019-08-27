import { EventData } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";
import { formatDistance } from 'date-fns'
import { parseISO } from "date-fns";

export function navigatingTo(args: EventData) {

    const page = <Page>args.object;
    let article = page.navigationContext;
    let date:Date = parseISO(article["publishedAt"]);
    let result = formatDistance(date, new Date(),{addSuffix: true});
    article["publishedAt"] = result;
    page.bindingContext = article;
}