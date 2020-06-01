'use strict';

const okayResponse = (res, data) => {
    const message = 'Okay';
    return res.status(200).json({status: true, message, data});
}

const createdResponse = (res, data) => {
    const message = 'Created Successfully';
    return res.status(201).json({status: true, message, data});
}

const badRequestResponse = (res, data) => {
    const message = 'Bad request';
    return res.status(400).json({status: false, message, data});
}

const unauthorizedResponse = (res, data) => {
    return res.status(401).json({data});
}

const notFoundResponse = (res, data) => {
    const message = 'Not found';
    return res.status(404).json({status: false, message, data});
}

const forbiddenResponse = (res, data) => {
    const message = 'forbidden';
    return res.status(403).json({status: false, message, data});
}

const internalServerErrorResponse = (res, data) => {
    const message = 'Internat server error';
    return res.status(500).json({status: false, message, data});
}

const updatedResponse = (res, data) => {
    const message = 'updated successfully';
    return res.status(202).json({status: true, message, data});
}

module.exports = {
    unauthorizedResponse,
    forbiddenResponse,
    okayResponse,
    createdResponse,
    notFoundResponse,
    badRequestResponse,
    internalServerErrorResponse,
    updatedResponse
}