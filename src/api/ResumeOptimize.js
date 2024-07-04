import service from "../http";
const url = {

}

export default class ResumeOptimize {
    static async resume_optimize() {
        return service("/resume/optimize/", {
            method: "post"
        })
    }
}