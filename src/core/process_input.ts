
/**
 * use this class to process incoming input into the format we need to pass to the 
 * handlerbars template
 */
export class ProcessInput {

    process(data){
        return {user: data};
    }

}