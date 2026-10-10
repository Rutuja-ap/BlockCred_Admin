// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CertificateRegistry {

    address public owner;

    struct Certificate {
        string certificateId;
        string studentId;
        string certificateHash;
        uint256 timestamp;
        bool exists;
    }

    mapping(string => Certificate) private certificates;

    event CertificateRegistered(
        string certificateId,
        string studentId,
        string certificateHash,
        uint256 timestamp
    );

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    function registerCertificate(
        string memory certificateId,
        string memory studentId,
        string memory certificateHash
    ) public onlyOwner {

        require(
            !certificates[certificateId].exists,
            "Certificate already exists"
        );

        certificates[certificateId] = Certificate({
            certificateId: certificateId,
            studentId: studentId,
            certificateHash: certificateHash,
            timestamp: block.timestamp,
            exists: true
        });

        emit CertificateRegistered(
            certificateId,
            studentId,
            certificateHash,
            block.timestamp
        );
    }

    function getCertificate(
        string memory certificateId
    )
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            uint256,
            bool
        )
    {
        require(
            certificates[certificateId].exists,
            "Certificate not found"
        );

        Certificate memory cert = certificates[certificateId];

        return (
            cert.certificateId,
            cert.studentId,
            cert.certificateHash,
            cert.timestamp,
            cert.exists
        );
    }

    function verifyCertificate(
        string memory certificateId,
        string memory certificateHash
    ) public view returns (bool) {

        if (!certificates[certificateId].exists) {
            return false;
        }

        return keccak256(
            bytes(certificates[certificateId].certificateHash)
        ) == keccak256(
            bytes(certificateHash)
        );
    }
}