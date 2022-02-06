import _ from "lodash"
import IllustrationTable from "../models/Illustrations";
import moment from 'moment';

export const checkSearch = (projectName: string, illustrationName: string, searchedTerm: string, fromDate: string, toDate: string, next: any) => {
    let query = {
        ProjectName: { $eq: projectName },
        IllustrationName: { $eq: illustrationName }
    };

    return IllustrationTable
        .findOne(query)
        .then((doc: any) => {
            return Promise.resolve(doc)
                .then((doc) => {
                    const filteredCommits: any[] = []
                    const commits: any[] = _.get(doc, 'IllustrationData.Timeliner.commits');
                    if (doc && searchedTerm != null && searchedTerm != "" && !fromDate && !toDate) {
                        commits.filter(word => {
                            if (
                                _.toString(searchedTerm) === word.username ||
                                _.toString(searchedTerm) === word.commitMessage ||
                                _.includes(word.username, _.toString(searchedTerm)) ||
                                _.includes(word.commitMessage, _.toString(searchedTerm))
                                // _.toString(moment(word.date).format('YYYY-MM-DD')) === _.toString(moment(searchedTerm).format('YYYY-MM-DD')) ||
                                // _.includes(_.toString(moment(word.date).format('YYYY-MM-DD')), _.toString(moment(searchedTerm).format('YYYY-MM-DD'))) ||
                                // _.includes(_.toString(moment(word.date).format('YYYY-MM-DD')), _.toString(moment(searchedTerm).format('YYYY'))) ||
                                // _.includes(_.toString(moment(word.date).format('YYYY-MM-DD')), _.toString(moment(searchedTerm).format('MM'))) ||
                                // _.includes(_.toString(moment(word.date).format('YYYY-MM-DD')), _.toString(moment(searchedTerm).format('DD'))) ||
                                // _.includes(_.toString(moment(word.date).format('YYYY-MM-DD')), _.toString(moment(searchedTerm).format('M'))) ||
                                // _.includes(_.toString(moment(word.date).format('YYYY-MM-DD')), _.toString(moment(searchedTerm).format('D')))

                            ) {
                                filteredCommits.push({ date: word.date, commitMessage: word.commitMessage, username: word.username })
                            }
                        })
                        next(null, filteredCommits)
                    }
                    else {
                        if (doc && !searchedTerm && fromDate != null && fromDate != "" && !toDate) {
                            commits.filter(word => {
                                if ((moment(moment(word.date).format('YYYY-MM-DD')).diff(moment(moment(fromDate).format('YYYY-MM-DD')), "days")) >= 0 ||
                                    (moment(moment(word.date).format('YYYY-MM-D')).diff(moment(moment(fromDate).format('YYYY-MM-D')), "days")) >= 0 ||
                                    (moment(moment(word.date).format('YYYY-M-D')).diff(moment(moment(fromDate).format('YYYY-M-D')), "days")) >= 0
                                ) {
                                    filteredCommits.push({ date: word.date, commitMessage: word.commitMessage, username: word.username })
                                }
                            })
                            next(null, filteredCommits)
                        }
                        else {
                            if (doc && !searchedTerm && fromDate != null && toDate != "" && !fromDate) {
                                commits.filter(word => {
                                    if ((moment(moment(word.date).format('YYYY-MM-DD')).diff(moment(moment(toDate).format('YYYY-MM-DD')), "days")) <= 0 ||
                                        (moment(moment(word.date).format('YYYY-MM-D')).diff(moment(moment(toDate).format('YYYY-MM-D')), "days")) <= 0 ||
                                        (moment(moment(word.date).format('YYYY-M-D')).diff(moment(moment(toDate).format('YYYY-M-D')), "days")) <= 0
                                    ) {
                                        filteredCommits.push({ date: word.date, commitMessage: word.commitMessage, username: word.username })
                                    }
                                })
                                next(null, filteredCommits)
                            }
                            else {
                                if (doc && !searchedTerm && fromDate != null && toDate != "" && fromDate != "" && toDate != null && fromDate != null) {
                                    commits.filter(word => {
                                        if (
                                            ((moment(moment(word.date).format('YYYY-MM-DD')).diff(moment(moment(fromDate).format('YYYY-MM-DD')), "days")) >= 0 ||
                                                (moment(moment(word.date).format('YYYY-MM-D')).diff(moment(moment(fromDate).format('YYYY-MM-D')), "days")) >= 0 ||
                                                (moment(moment(word.date).format('YYYY-M-D')).diff(moment(moment(fromDate).format('YYYY-M-D')), "days")) >= 0) &&
                                            ((moment(moment(word.date).format('YYYY-MM-DD')).diff(moment(moment(toDate).format('YYYY-MM-DD')), "days")) <= 0 ||
                                                (moment(moment(word.date).format('YYYY-MM-D')).diff(moment(moment(toDate).format('YYYY-MM-D')), "days")) <= 0 ||
                                                (moment(moment(word.date).format('YYYY-M-D')).diff(moment(moment(toDate).format('YYYY-M-D')), "days")) <= 0)
                                        ) {
                                            filteredCommits.push({ date: word.date, commitMessage: word.commitMessage, username: word.username })
                                        }
                                    })
                                    next(null, filteredCommits)
                                }
                                else {
                                    if (doc && searchedTerm != "" && searchedTerm != null && fromDate != null && toDate != "" && fromDate != "" && toDate != null && fromDate != null) {
                                        commits.filter(word => {
                                            if (
                                                ((moment(moment(word.date).format('YYYY-MM-DD')).diff(moment(moment(fromDate).format('YYYY-MM-DD')), "days")) >= 0 ||
                                                    (moment(moment(word.date).format('YYYY-MM-D')).diff(moment(moment(fromDate).format('YYYY-MM-D')), "days")) >= 0 ||
                                                    (moment(moment(word.date).format('YYYY-M-D')).diff(moment(moment(fromDate).format('YYYY-M-D')), "days")) >= 0) &&
                                                ((moment(moment(word.date).format('YYYY-MM-DD')).diff(moment(moment(toDate).format('YYYY-MM-DD')), "days")) <= 0 ||
                                                    (moment(moment(word.date).format('YYYY-MM-D')).diff(moment(moment(toDate).format('YYYY-MM-D')), "days")) <= 0 ||
                                                    (moment(moment(word.date).format('YYYY-M-D')).diff(moment(moment(toDate).format('YYYY-M-D')), "days")) <= 0) &&
                                                (_.toString(searchedTerm) === word.username ||
                                                    _.toString(searchedTerm) === word.commitMessage ||
                                                    _.includes(word.username, _.toString(searchedTerm)) ||
                                                    _.includes(word.commitMessage, _.toString(searchedTerm))
                                                    // _.toString(moment(word.date).format('YYYY-MM-DD')) === _.toString(moment(searchedTerm).format('YYYY-MM-DD')) ||
                                                    // _.includes(_.toString(moment(word.date).format('YYYY-MM-DD')), _.toString(moment(searchedTerm).format('YYYY-MM-DD'))) ||
                                                    // _.includes(_.toString(moment(word.date).format('YYYY-MM-DD')), _.toString(moment(searchedTerm).format('YYYY'))) ||
                                                    // _.includes(_.toString(moment(word.date).format('YYYY-MM-DD')), _.toString(moment(searchedTerm).format('MM'))) ||
                                                    // _.includes(_.toString(moment(word.date).format('YYYY-MM-DD')), _.toString(moment(searchedTerm).format('DD'))) ||
                                                    // _.includes(_.toString(moment(word.date).format('YYYY-MM-DD')), _.toString(moment(searchedTerm).format('M'))) ||
                                                    // _.includes(_.toString(moment(word.date).format('YYYY-MM-DD')), _.toString(moment(searchedTerm).format('D'))))
                                                )) {
                                                filteredCommits.push({ date: word.date, commitMessage: word.commitMessage, username: word.username })
                                            }
                                        })
                                        next(null, filteredCommits)
                                    }
                                }
                            }
                        }
                    }
                })
        })
        .catch((err: any) => next(err, null))
}