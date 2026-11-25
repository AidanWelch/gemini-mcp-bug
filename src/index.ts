import { McpServer } from "@modelcontextprotocol/server";
import { createMcpHandler } from "agents/mcp/server";

function createServer() {
	const server = new McpServer({
		name: "Gemini MCP Client Bug POC",
		version: "1.0.0",
	});

	server.registerTool(
		"test-mcp-client",
		{
			title: "Test MCP Client",
			description: `Call to test if the MCP client you are using
				correctly handles multiple block responses.  There are three
				blocks.  The calling agent will be told if each block was
				correctly received individually.`,
		},
		async () => ({
			content: [
				{ type: "text", text: "The test passes for the first block." },
				{ type: "text", text: "The test passes for the second block." },
				{ type: "text", text: "The test passes for the third block." },
			],
		}),
	);

	return server;
}

const handler = createMcpHandler(createServer);

export default {
	fetch(request: Request, env: Env, ctx: ExecutionContext) {
		return handler(request, env, ctx);
	},
} satisfies ExportedHandler<Env>;
