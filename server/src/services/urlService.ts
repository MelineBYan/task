import Workspace from '../db/models/workspace';

export default class UrlService {
    public async generateUniqueUrl(value:string) {
        async function loop(suffix) {
            const url = await Workspace.findOne({url: value + suffix });
            if (url != null){ 
                return loop(Number(suffix) + 1);  // <- recur
            }                                           
            return value + suffix;
        }
        return loop(''); // <- initial suffix
    }
}
