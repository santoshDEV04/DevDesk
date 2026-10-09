
import Workspace from "../models/workspace.model.js";

export const createWorkspace = async (req, res) => {
    try {
        // Workspace details come from the request body
        const { name, description } = req.body;

        if (typeof name !== "string" || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Workspace name is required."
            });
        }

        if (
            description !== undefined &&
            typeof description !== "string"
        ) {
            return res.status(400).json({
                success: false,
                message: "Description must be a string."
            });
        }

        const workspace = await Workspace.create({
            name: name.trim(),
            description: description?.trim() ?? "",
            owner: req.user._id,
            members: [req.user._id]
        });

        return res.status(201).json({
            success: true,
            message: "Workspace created successfully.",
            data: {
                workspace
            }
        });

    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        console.error("Create workspace error:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong while creating the workspace."
        });
    }
};

